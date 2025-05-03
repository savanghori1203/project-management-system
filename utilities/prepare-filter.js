function prepareTaskFilter(query) {
    let filter = {};

    // Filter by exact matches
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assigned_engineer_id) filter.assigned_engineer_id = query.assigned_engineer_id;
    if (query.assigned_by) filter.assigned_by = query.assigned_by;
    if (query.organization_id) filter.organization_id = query.organization_id;
    if (query.project_id) filter.project_id = query.project_id;

    if (query.search) {
        filter.$or = [
            { title: { $regex: query.search, $options: "i" } },
            { description: { $regex: query.search, $options: "i" } },
        ];
    }

    // Filter by task tags (supports multiple comma-separated tags)
    if (query.task_tags) {
        filter.task_tags = { $in: query.task_tags.split(",") };
    }

    // Filter by estimated hours (range-based filtering)
    if (query.minEstimatedHours) filter.estimated_hours = { ...filter.estimated_hours, $gte: Number(query.minEstimatedHours) };
    if (query.maxEstimatedHours) filter.estimated_hours = { ...filter.estimated_hours, $lte: Number(query.maxEstimatedHours) };
    
    // Filter by actual hours (range-based filtering)
    if (query.minActualHours) filter.actual_hours = { ...filter.actual_hours, $gte: Number(query.minActualHours) };
    if (query.maxActualHours) filter.actual_hours = { ...filter.actual_hours, $lte: Number(query.maxActualHours) };

    // Date range filtering (due date, created_at, modified_at)
    if (query.minDueDate) filter.due_date = { ...filter.due_date, $gte: new Date(query.minDueDate) };
    if (query.maxDueDate) filter.due_date = { ...filter.due_date, $lte: new Date(query.maxDueDate) };

    if (query.minCreatedAt) filter.created_at = { ...filter.created_at, $gte: new Date(query.minCreatedAt) };
    if (query.maxCreatedAt) filter.created_at = { ...filter.created_at, $lte: new Date(query.maxCreatedAt) };

    if (query.minModifiedAt) filter.modified_at = { ...filter.modified_at, $gte: new Date(query.minModifiedAt) };
    if (query.maxModifiedAt) filter.modified_at = { ...filter.modified_at, $lte: new Date(query.maxModifiedAt) };

    return filter;
}

module.exports = prepareTaskFilter;
